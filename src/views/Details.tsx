import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
    id: string;
}

interface DetailsProps extends RouteComponentProps<MatchParams> {}

export default class Details extends Component<DetailsProps> {
    render () {
        return (
            <div>
                <span>Details Page {this.props.match.params.id}</span>
            </div>
        )
    }
}