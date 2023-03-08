export type TextWidgetProps = {
  value: string;
};

export const TextWidget = ({ value }: TextWidgetProps) => {
  return <div>HI {value}</div>;
};
