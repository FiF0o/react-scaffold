import * as React from 'react';

export interface IPage1Props {
  label: string;
}

interface IState {
  count: number;
}

export class Page1 extends React.Component<IPage1Props, IState> {
  
  public static defaultProps = {
    label: 'count'
  }

  public state: IState = {
    count: 0,
  };

  public handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  }

  public render() {
    const { handleIncrement } = this;
    const { label } = this.props;
    const { count } = this.state;

    return (
      <div>
        <span>{label}: {count} </span>
        <a
          className="waves-effect waves-light btn"
          onClick={handleIncrement}
        >
          {`Increment`}
        </a>
      </div>
    );
  }
}