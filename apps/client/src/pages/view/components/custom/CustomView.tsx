import { LegacyFunctionComponent } from '@shukun/component';
import { PostMessageCustomModeType, PostMessageEvent } from '@shukun/postmate';
import { ViewSchema } from '@shukun/schema';
import { useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { CustomViewExperiment } from './CustomViewExperiment';

export interface CustomViewProps {
  view: ViewSchema;
}

export const CustomView: LegacyFunctionComponent<CustomViewProps> = ({
  view,
}) => {
  const { t } = useTranslation();

  const customMode = useMemo(() => PostMessageCustomModeType.Page, []);

  const handleEmit = useCallback(
    (eventName: PostMessageEvent) => {
      console.info(t('customView.noSupport', { customMode, eventName }));
    },
    [customMode, t],
  );

  if (!view.value) {
    return <div>{t('customView.valueIsNotSet')}</div>;
  }

  return (
    <CustomViewExperiment
      customMode={customMode}
      url={view.value}
      search={null}
      sources={null}
      defaultHeight="100%"
      onFinish={() => handleEmit(PostMessageEvent.EMIT_FINISH)}
      onRefresh={() => handleEmit(PostMessageEvent.EMIT_REFRESH)}
      onSearch={() => handleEmit(PostMessageEvent.EMIT_SEARCH)}
      onLoading={() => handleEmit(PostMessageEvent.EMIT_LOADING)}
    />
  );
};
