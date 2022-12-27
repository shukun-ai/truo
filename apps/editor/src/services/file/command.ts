import { BehaviorSubject, map } from 'rxjs';

import {
  pickDirectory,
  saveJsonToFile,
  AllowedSubDirectory,
} from '../../utils/file-system';

export class FileCommand {
  entryHandleRef = new BehaviorSubject<FileSystemDirectoryHandle | null>(null);

  exist$() {
    return this.entryHandleRef.pipe(map((entryHandleRef) => !!entryHandleRef));
  }

  exist() {
    return !!this.entryHandleRef.getValue();
  }

  getEntryHandle() {
    const entryHandle = this.entryHandleRef.getValue();
    if (!entryHandle) {
      throw new Error('The entry handle is not created.');
    }
    return entryHandle;
  }

  async openEntryHandle() {
    const entryHandle = await pickDirectory();

    if (this.exist()) {
      throw new Error('The entry handle is created.');
    }

    this.entryHandleRef.next(entryHandle);
    return entryHandle;
  }

  save(content: unknown, folder: AllowedSubDirectory, file: string) {
    const text = JSON.stringify(content, null, 2);
    const entryHandle = this.getEntryHandle();
    saveJsonToFile(entryHandle, text + '\n', folder, file);
  }
}
