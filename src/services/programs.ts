export type RadioProgram = {
  id: string;
  name: string;
  days: number[];
  time: number;
  topic: string;
};

type ProgramsResponse = {
  programs: RadioProgram[];
};

const PROGRAMS_URL =
  'https://radio-africana-dashboard.vercel.app/api/programs';

export async function fetchPrograms(): Promise<RadioProgram[]> {
  const response = await fetch(PROGRAMS_URL);

  if (!response.ok) {
    throw new Error(
      `Unable to fetch Radio Africana programmes: ${response.status} ${response.statusText}`,
    );
  }

  const data =
    (await response.json()) as ProgramsResponse;

  if (
    !data ||
    !Array.isArray(data.programs)
  ) {
    throw new Error(
      'Invalid Radio Africana programmes response.',
    );
  }

  return data.programs.filter(
    program =>
      typeof program?.id === 'string' &&
      typeof program?.name === 'string' &&
      Array.isArray(program?.days) &&
      typeof program?.time === 'number' &&
      typeof program?.topic === 'string',
  );
}