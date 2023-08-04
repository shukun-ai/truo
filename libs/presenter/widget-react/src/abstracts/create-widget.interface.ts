export type CreateWidget = <T>(
  reactWidget: (props: T & WidgetDefaultProps) => JSX.Element,
) => (props: T & WidgetDefaultProps) => JSX.Element;

type WidgetDefaultProps = {
  //
};
