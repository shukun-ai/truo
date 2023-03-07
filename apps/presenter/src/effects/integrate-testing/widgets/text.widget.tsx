export type TextWidgetProps = {
  value: string;
};

export const TextWidget = ({ value }: TextWidgetProps) => {
  console.log('text', value);
  return <div>HI {value}</div>;
};
