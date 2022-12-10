export type AllowedSubDirectory = 'metadata' | 'views';

export const JSON_FILE_SUFFIX = '.json';

export async function pickDirectory() {
  const directoryHandle = await showDirectoryPicker({
    mode: 'readwrite',
  });

  return directoryHandle;
}

export async function readDirectoryJson(
  entryHandle: FileSystemDirectoryHandle,
  directoryName: string,
): Promise<Record<string, string>> {
  let jsonContents: Record<string, string> = {};

  const subDirectoryHandle = await entryHandle.getDirectoryHandle(
    directoryName,
    {
      create: true,
    },
  );

  for await (const { kind, name } of subDirectoryHandle.values()) {
    const json = await readJsonFile(subDirectoryHandle, kind, name);

    if (json) {
      jsonContents = {
        ...jsonContents,
        ...json,
      };
    }
  }

  return jsonContents;
}

export async function readJsonFile(
  subDirectoryHandle: FileSystemDirectoryHandle,
  kind: 'file' | 'directory',
  name: string,
) {
  if (kind !== 'file') {
    return null;
  }

  if (!name.trim().endsWith(JSON_FILE_SUFFIX)) {
    return null;
  }

  const fileHandle = await subDirectoryHandle.getFileHandle(name);
  const file = await fileHandle.getFile();
  const content = await file.text();
  const atomName = name.substring(0, name.length - JSON_FILE_SUFFIX.length);

  return {
    [atomName]: content,
  };
}

export function parseJsonContents<T>(
  jsonContents: Record<string, string>,
): Record<string, T> {
  const parsedJsonContents: Record<string, T> = {};

  for (const [key, content] of Object.entries(jsonContents)) {
    parsedJsonContents[key] = JSON.parse(content);
  }

  return parsedJsonContents;
}

export async function saveJsonToFile(
  entryHandle: FileSystemDirectoryHandle,
  text: string,
  subDirectory: AllowedSubDirectory,
  atomName: string,
) {
  const subHandle = await entryHandle.getDirectoryHandle(subDirectory);
  const fileHandle = await subHandle.getFileHandle(
    atomName + JSON_FILE_SUFFIX,
    { create: true },
  );

  const writable = await fileHandle.createWritable();
  await writable.write(text);
  await writable.close();
}
