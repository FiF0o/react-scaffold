import * as React from 'react';

export interface IPage2Props {
  label: string;
}

export class Page2 extends React.Component<IPage2Props, {}> {
  public static defaultProps = {
    label: 'label name'
  }

  constructor(props:IPage2Props) {
    super(props);
    this.state = {label: props.label}
  }

  public render() {
    const { label } = this.props;

    return (
      <div>
        <h2>{label}</h2>
      </div>
    );
  }
}