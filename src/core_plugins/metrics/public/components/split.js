import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import FieldSelect from './aggs/field_select';
import MetricSelect from './aggs/metric_select';
import calculateLabel from '../../common/calculate_label';
import createTextHandler from './lib/create_text_handler';
import createSelectHandler from './lib/create_select_handler';
import uuid from 'node-uuid';

import SplitByTerms from './splits/terms';
import SplitByFilter from './splits/filter';
import SplitByFilters from './splits/filters';
import SplitByEverything from './splits/everything';

class Split extends Component {

  componentWillReceiveProps(nextProps) {
    const { model } = nextProps;
    if (model.split_mode === 'filters' && !model.split_filters) {
      this.props.onChange({
        split_filters: [
          { color: model.color, id: uuid.v1() }
        ]
      });
    }
  }

  render() {
    const { model, panel } = this.props;
    const indexPattern = model.override_index_pattern &&
      model.series_index_pattern ||
      panel.index_pattern;
    if (model.split_mode === 'filter') {
      return (
        <SplitByFilter
          model={model}
          onChange={this.props.onChange} />
      );
    }
    if (model.split_mode === 'filters') {
      return (
        <SplitByFilters
          model={model}
          onChange={this.props.onChange} />
      );
    }
    if (model.split_mode === 'terms') {
      return (
        <SplitByTerms
          model={model}
          indexPattern={indexPattern}
          fields={this.props.fields}
          onChange={this.props.onChange} />
      );
    }
    return (
      <SplitByEverything
        model={model}
        onChange={this.props.onChange} />
    );
  }

}

Split.propTypes = {
  fields: PropTypes.object,
  model: PropTypes.object,
  onChange: PropTypes.func,
  panel: PropTypes.object
};

export default Split;
