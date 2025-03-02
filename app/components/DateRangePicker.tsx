import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import theme from '@/constants/theme';

interface DatePickerProps {
  onDateRangeSelected?: (startDate: Date, endDate: Date | null) => void;
}

export default function DatePicker({ onDateRangeSelected }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
      days.push(null); // Empty cells before the first day
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handleDayPress = (day: Date | null) => {
    if (!day) return;
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day > startDate) {
      setEndDate(day);
      if (onDateRangeSelected) onDateRangeSelected(startDate, day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const isInRange = (day: Date) => {
    if (!startDate || !endDate) return false;
    return day > startDate && day < endDate;
  };

  const changeMonth = (delta: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.monthButton} onPress={() => changeMonth(-1)}>
          <Text style={styles.monthText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </Text>
        <TouchableOpacity style={styles.monthButton} onPress={() => changeMonth(1)}>
          <Text style={styles.monthText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekdaysContainer}>
        {weekdays.map((day, index) => (
          <Text key={index} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.daysContainer}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCell,
              day && startDate && day.toDateString() === startDate.toDateString() && styles.startDateCell,
              day && endDate && day.toDateString() === endDate.toDateString() && styles.endDateCell,
              day && isInRange(day) && styles.inRangeCell,
            ]}
            onPress={() => handleDayPress(day)}
            disabled={!day}
          >
            <Text
              style={[
                styles.dayText,
                day && (startDate?.toDateString() === day.toDateString() || endDate?.toDateString() === day.toDateString()) && styles.selectedDayText,
              ]}
            >
              {day ? day.getDate() : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  monthButton: {
    padding: theme.spacing.xs,
  },
  monthText: {
    fontSize: theme.fontSizes.l,
    fontWeight: '600',
    color: Colors.text,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.s,
  },
  weekdayText: {
    fontSize: theme.fontSizes.s,
    color: Colors.subtext,
    width: 40,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  dayText: {
    fontSize: theme.fontSizes.s,
    color: Colors.text,
  },
  startDateCell: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  endDateCell: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  inRangeCell: {
    backgroundColor: `${Colors.primary}30`,
  },
  selectedDayText: {
    color: Colors.white,
    fontWeight: '600',
  },
});