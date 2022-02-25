import { AttachmentSchema } from '@shukun/schema';
import { BehaviorSubject } from 'rxjs';

export const attachmentPreviewState$ = new BehaviorSubject<
  AttachmentSchema[] | null
>(null);

export function openPreviewAttachments(attachments: AttachmentSchema[]) {
  attachmentPreviewState$.next(attachments);
}

export function closePreviewAttachments() {
  attachmentPreviewState$.next(null);
}
