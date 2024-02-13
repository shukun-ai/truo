import { PostMessageService } from '@shukun/postmate';
import { Button } from 'antd';
import { useObservableState } from 'observable-hooks';

export type IframePlaygroundProps = {
  //
};

export const IframePlayground = () => {
  const auth = useObservableState(postMessageService.auth$, null);
  const sources = useObservableState(postMessageService.sources$, null);
  const search = useObservableState(postMessageService.search$, null);
  const customMode = useObservableState(postMessageService.customMode$, null);
  const environment = useObservableState(postMessageService.environment$, null);

  return (
    <div>
      <h5>Iframe Playground</h5>
      <div>
        <Button
          onClick={() => {
            postMessageService.emitRefresh();
          }}
        >
          emit refresh
        </Button>
        <Button
          onClick={() => {
            postMessageService.emitHeight('300px');
          }}
        >
          Set height 300px
        </Button>
        <Button
          onClick={() => {
            postMessageService.emitHeight('100px');
          }}
        >
          Set height 100px
        </Button>
        <Button
          onClick={() => {
            postMessageService.emitHeight(null);
          }}
        >
          Set height auto
        </Button>
      </div>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
      <pre>{JSON.stringify(sources, null, 2)}</pre>
      <pre>{JSON.stringify(search, null, 2)}</pre>
      <pre>{JSON.stringify(customMode, null, 2)}</pre>
      <pre>{JSON.stringify(environment, null, 2)}</pre>
    </div>
  );
};

const postMessageService = new PostMessageService();
