import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

import { getDateStr, getDaysEgo } from '../../helpers';
import { getdashboardInfoData } from '../../store/actions/core_actions';
import { changeFilterDate, changeRangeDate } from '../../store/actions/dashboard_range_actions';


const RangeDateFilterItem = (props) => {
  return (
    <li
      key={props.date}
      id={props.date}
      onClick={e => props.changeFilterDate(props)}
      className={"Dashboard__date-filter_item " + (props.className ? props.className : '') + (props.filteredDate === props.date ? ' active ' : '')}
    >
      {props.text}
    </li>
  );
};

const RangeDay = (props) => {
  return (
    <span>
      <span>
        {new Date(props.day._d).getDate()}
      </span>
    </span>
  );
};


class RangeDateFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRangeOpen: false,
      isRangeClosing: false,

      startDate: null,
      endDate: null,
      focusedInput: null,
    };
  }

  openRangeDate(date){
    if(this.state.isRangeOpen || this.state.isRangeClosing) {
      return;
      this.setState({isRangeClosing: false});
    }

    this.setState({
      focusedInput: 'startDate',
      isRangeOpen: true
    });
  }

  submitRangeDate() {
    if(!this.state.startDate || !this.state.endDate) return;
    const data = {
      date: `${getDateStr(this.state.startDate._d)}-${getDateStr(this.state.endDate._d)}`,
      id: 'range',
    };
    
    this.props.changeRangeDate(data);

    this.onRangeClose();

  }

  onDatesChange({ startDate, endDate}){
    this.setState({
      startDate,
      endDate
    });
    
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  onRangeClose(e, rangeDate) {
    if (!this.state.focusedInput) {
      this.setState({
        isRangeOpen: false,
        isRangeClosing: true,
      });
      setTimeout(() => {
        try{
          this.setState({
            isRangeClosing: false,
          });
        } catch (e) {
          console.log('error', e);
        }
      }, 500);
    } else {
      this.setState({
        focusedInput: 'startDate',
      });
    }
  }

  render() {
    const { filteredDate, dateRangeStart, dateRangeEnd } = this.props;

    return (
      <div className="Dashboard__date-filter">
        <ul className="Dashboard__date-filter_list">

          <RangeDateFilterItem
            text={'Today'}
            date={'0-0'}
            changeFilterDate={this.props.changeFilterDate}
            getData={this.getDataForRange}
            filteredDate={filteredDate}
            id={'today'}
          />

          <RangeDateFilterItem
            text={'7 days'}
            date={`${getDateStr(getDaysEgo(7))}-0`}
            changeFilterDate={this.props.changeFilterDate}
            getData={this.getDataForRange}
            filteredDate={filteredDate}
            id={'7days'}
          />

          <RangeDateFilterItem
            text={'30 days'}
            date={`${getDateStr(getDaysEgo(30))}-0`}
            changeFilterDate={this.props.changeFilterDate}
            getData={this.getDataForRange}
            filteredDate={filteredDate}
            id={'30days'}
          />

          <RangeDateFilterItem
            text={'90 days'}
            date={`${getDateStr(getDaysEgo(90))}-0`}
            changeFilterDate={this.props.changeFilterDate}
            getData={this.getDataForRange}
            filteredDate={filteredDate}
            id={'90days'}
          />

          <RangeDateFilterItem
            text={'Range'}
            date={`${dateRangeStart}-${dateRangeEnd}`}
            changeFilterDate={this.openRangeDate.bind(this)}
            filteredDate={filteredDate}
          />
        </ul>

        {
          this.state.isRangeOpen
            ? (
              <div className="Dashboard__date-filter_range">
                <DateRangePicker
                  startDate={this.state.startDate}
                  startDateId="start-date"
                  endDate={this.state.endDate}
                  endDateId="end-date"
                  onDatesChange={newDate => this.onDatesChange(newDate)}
                  focusedInput={this.state.focusedInput}
                  onFocusChange={focusedInput => this.onFocusChange(focusedInput)}
                  disabled={null}
                  enableOutsideDays={false}
                  isDayBlocked={day => false}
                  isOutsideRange={day => false}
                  isDayHighlighted={day => false}
                  firstDayOfWeek={1}
                  renderDayContents={day => <RangeDay day={day}/>}
                  onClose={this.onRangeClose.bind(this)}
                  navPrev={<span className="DayPickerNavigation_button DayPickerNavigation_button-prev DayPickerNavigation_button__horizontalDefault DayPickerNavigation_leftButton__horizontalDefault icon-array-left" />}
                  navNext={<span className="DayPickerNavigation_button DayPickerNavigation_button-next DayPickerNavigation_button__horizontalDefault DayPickerNavigation_rightButton__horizontalDefault icon-array-left" />}
                />

                <div className="Dashboard__date-filter__footer">
                  <button 
                    disabled={!this.state.startDate || !this.state.endDate}
                    onMouseDown={this.submitRangeDate.bind(this)}
                    className="Dashboard__date-filter__submit"
                  >
                    Ok
                  </button>
                  
                </div>
              </div>
            )
            : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filteredDate: `${state.dashboard_range_reducer.dateFilterStart}-${state.dashboard_range_reducer.dateFilterEnd}`,
  dateRangeStart: state.dashboard_range_reducer.dateRangeStart,
  dateRangeEnd: state.dashboard_range_reducer.dateRangeEnd,
});

const mapDispatchToProps = dispatch => ({
  changeFilterDate: dateStr => dispatch(changeFilterDate(dateStr)),
  getdashboardInfoData: val => dispatch(getdashboardInfoData(val)),
  changeRangeDate: dateStr => dispatch(changeRangeDate(dateStr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RangeDateFilter);
