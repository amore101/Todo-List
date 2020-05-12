import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import todoItems from '../data';
import styles from '../App.module.css';
let d = new Date();

let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class CalendarDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: d.getMonth(),
            year:  d.getFullYear(),
            day:   d.getDay(),
            date:  d.getDate(),
            direction: "",
        };
        this.navigateForwards = this.navigateForwards.bind(this);
        this.navigateBackwards = this.navigateBackwards.bind(this);
    }

    componentDidMount(){
        this.addDateEntry();
        Mousetrap.bind('right', this.navigateForwards);
        Mousetrap.bind('left', this.navigateBackwards);
    }
    componentWillUnmount() {
        Mousetrap.unbind('right', this.navigateForwards);
        Mousetrap.unbind('left', this.navigateBackwards);
    }

    addToSelf(a, b) {
        return a += b;
    }

    subtractFromSelf(a, b) {
        return a -= b;
    }

    checkMonth(month) {
        switch (month) {
            //Jan, March, May, July, August, Oct, Dec
            case 0:
            case 2:
            case 4:
            case 6: 
            case 7: 
            case 9: 
            case 11:
                return 31;
            //April, June, Sep, Nov
            case 3:
            case 5: 
            case 8: 
            case 10:
                return 30;
            //Feb
            case 1:
                return 28;
        }
    }

    updateCalendarDate() {
        let currentDate = this.state.date;
        let currentMonth = this.state.month;
        let currentDay = this.state.day;
        let currentYear = this.state.year;
        let daysInMonth = this.checkMonth(this.state.month);
        
        if (this.state.direction === "forward") {
            if (currentDate === daysInMonth && currentMonth === 11) {
                this.setState({
                    date: 1,
                    month: 0
                }, () => this.addDateEntry())
            } else if (currentDate === daysInMonth) {
                this.setState({
                    date: 1,
                    month: this.addToSelf(currentMonth, 1)
                }, () => this.addDateEntry())
            } else {
                this.setState(() => ({
                    date: this.addToSelf(currentDate, 1),
                }), () => this.addDateEntry())
            }

            if (currentDay === 6) {
                this.setState(() => ({
                    day: 0,
                }), () => this.addDateEntry())
            } else {
                this.setState(() => ({
                    day: this.addToSelf(currentDay, 1),
                }), () => this.addDateEntry())
            }

            if (currentMonth === 11 && currentDate === 31) {
                this.setState(() => ({
                    year: this.addToSelf(currentYear, 1)
                }), () => this.addDateEntry())
            }
        } 
        if (this.state.direction === "backwards") {
            if (currentDate === 1) {
                this.setState(() => ({
                    month: this.subtractFromSelf(currentMonth, 1)
                }), () => this.setState({date:  this.checkMonth(this.state.month)}), () => this.addDateEntry()) //set date to the daysInMonth of the updated month state
            } else {
                this.setState(() => ({
                    date: this.subtractFromSelf(currentDate, 1)
                }), () => this.addDateEntry())
            }

            if (currentDay === 0) {
                this.setState(() => ({
                    day: 6,
                }), () => this.addDateEntry())
            } else {
                this.setState(() => ({
                    day: this.subtractFromSelf(currentDay, 1),
                }), () => this.addDateEntry())
            }

            if (currentMonth === 0 && currentDate === 1) {
                this.setState(() => ({
                    year: this.subtractFromSelf(currentYear, 1)
                }), () => this.addDateEntry())
            }

            if (currentDate === 1 && currentMonth === 0) {
                this.setState(() => ({
                    date: 31,
                    month: 11
                }), () => this.addDateEntry())
            }
        }
    }

    addDateEntry() {
        let currentDate = `${this.state.day}${this.state.month}${this.state.date}${this.state.year}`;

        this.props.getCurrentDate(currentDate);

        if (!todoItems[currentDate]) {
            todoItems[currentDate] = [];
        }
    }

    navigateForwards() {
        this.setState({
            direction: "forward"
        }, 
        () => this.updateCalendarDate());
    }

    navigateBackwards() {
        this.setState({
            direction: "backwards"
        }, () => this.updateCalendarDate())
    }

    render() {
        return(
            <div className={styles.calDate}>
                <button onClick={this.navigateBackwards} className={styles.navBtn}>
                    <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                </button>
                <div className={styles.date}>{this.state.date}</div>
                <div className={styles.monthYear}>
                    <div className={styles.month}>{months[this.state.month]}</div>
                    <div className={styles.year}>{this.state.year}</div>
                </div>
                <div className={styles.day}>{days[this.state.day]}</div>
                <button onClick={this.navigateForwards} className={styles.navBtn}>
                    <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                </button>
            </div>
        )
    }
}

export default CalendarDate;
