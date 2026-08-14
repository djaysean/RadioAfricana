import {decode} from 'he';

import {api} from './api';

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  link: string;
};

export type MembersPage = {
  members: TeamMember[];
  hasNextPage: boolean;
};

type WPMember = {
  id: number;
  slug: string;
  link: string;

  title: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;

    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        taxonomy?: string;
      }>
    >;
  };
};

const MEMBERS_PER_PAGE = 5;

const KNOWN_ROLES = [
  'Presenter',
  'Producer',
  'Dj',
  'DJ',
];

function cleanText(
  html: string,
): string {
  return decode(
    html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function getEmbeddedRole(
  member: WPMember,
): string | null {
  const termGroups =
    member._embedded?.[
      'wp:term'
    ] ?? [];

  for (
    const terms of termGroups
  ) {
    const role =
      terms.find(term => {
        const name =
          term.name
            ?.trim()
            .toLowerCase();

        return (
          name === 'presenter' ||
          name === 'producer' ||
          name === 'dj'
        );
      });

    if (role?.name) {
      return decode(
        role.name.trim(),
      );
    }
  }

  return null;
}

async function getRoleFromProfile(
  member: WPMember,
): Promise<string | null> {
  try {
    const response =
      await fetch(member.link);

    if (!response.ok) {
      return null;
    }

    const html =
      await response.text();

    /*
     * The public Radio Africana member pages
     * display the member role immediately before
     * the member's name. We look for the known
     * role labels rather than guessing a WordPress
     * REST taxonomy endpoint.
     */

    const normalizedHtml =
      html.replace(
        /\s+/g,
        ' ',
      );

    for (
      const role of KNOWN_ROLES
    ) {
      const escapedRole =
        role.replace(
          /[.*+?^${}()|[\]\\]/g,
          '\\$&',
        );

      const rolePattern =
        new RegExp(
          `(?:>|"|')\\s*${escapedRole}\\s*(?:<|<\\/|\\s|&nbsp;|")`,
          'i',
        );

      if (
        rolePattern.test(
          normalizedHtml,
        )
      ) {
        if (
          role.toLowerCase() ===
          'dj'
        ) {
          return 'Dj';
        }

        return role;
      }
    }

    return null;
  } catch (error) {
    console.error(
      `Failed to load profile for team member ${member.id}:`,
      error,
    );

    return null;
  }
}

async function getRole(
  member: WPMember,
): Promise<string> {
  const embeddedRole =
    getEmbeddedRole(member);

  if (embeddedRole) {
    return embeddedRole;
  }

  const profileRole =
    await getRoleFromProfile(
      member,
    );

  if (profileRole) {
    return profileRole;
  }

  return 'Radio Africana Team';
}

function getImage(
  member: WPMember,
): string {
  return (
    member._embedded?.[
      'wp:featuredmedia'
    ]?.[0]?.source_url ?? ''
  );
}

async function mapMember(
  member: WPMember,
): Promise<TeamMember> {
  return {
    id: String(member.id),

    slug: member.slug,

    name: decode(
      member.title.rendered,
    ),

    role: await getRole(member),

    bio: cleanText(
      member.content.rendered,
    ),

    image: getImage(member),

    link: member.link,
  };
}

export async function fetchMembers(
  page: number = 1,
): Promise<MembersPage> {
  const response =
    await api.get<WPMember[]>(
      `/wp/v2/members?_embed&per_page=${MEMBERS_PER_PAGE + 1}&page=${page}`,
    );

  const hasNextPage =
    response.length >
    MEMBERS_PER_PAGE;

  const pageMembers =
    response.slice(
      0,
      MEMBERS_PER_PAGE,
    );

  const members =
    await Promise.all(
      pageMembers.map(
        mapMember,
      ),
    );

  return {
    members,
    hasNextPage,
  };
}