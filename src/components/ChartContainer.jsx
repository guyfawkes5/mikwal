import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

import { fetchCensusData } from '../actions';

import IrelandChart from './IrelandChart';

class ChartContainer extends React.Component {
    element;
    chart;
    state = {
        dimensions: {},
        loadingProgress: {
            isLoading: true,
            percentage: 0
        }
    };

    componentDidMount() {
        this.chart = new IrelandChart(this.element, this.onChartReady.bind(this), this.onChartLoadingProgress.bind(this));

        this.updateDimensions();

        window.addEventListener('resize', this.updateDimensions.bind(this));

        const { dispatch } = this.props;
        dispatch(fetchCensusData('CAR_OWNERSHIP'));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        const { dimensions } = nextState;

        if (this.chart) {
            this.chart.resize(dimensions.width, dimensions.height);

            let newCensusData = nextProps.censusData.find(censusData => !censusData.inProgress && censusData.data !== undefined);

            if (newCensusData) {
                this.chart.censusData(newCensusData.data);
            }
        }
    }

    render() {
        const state = this.state,
            isLoading = state.loadingProgress.isLoading;

        return <div className="fill-block">
            {isLoading && <LinearProgress
                variant="determinate"
                color="secondary"
                value={state.loadingProgress.percentage}
            />}
            <div
                ref={element => this.element = element}
                className="fill-block"
            />
        </div>;
    }

    updateDimensions() {
        const width = this.element.clientWidth,
            height = this.element.clientHeight;

        this.setState({ dimensions: { width, height } });
    }

    onChartLoadingProgress(percentage) {
        this.setState(prevState => {
            const loadingProgress = {...prevState.loadingProgress};
            loadingProgress.percentage = percentage;
            return { loadingProgress };
        });
    }

    onChartReady() {
        this.setState(prevState => {
            const loadingProgress = {...prevState.loadingProgress};
            loadingProgress.isLoading = false;
            return { loadingProgress };
        });
    }
}

ChartContainer.propTypes = {
            censusData: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    const { censusData } = state;
    return { censusData };
};

export default connect(mapStateToProps)(ChartContainer);