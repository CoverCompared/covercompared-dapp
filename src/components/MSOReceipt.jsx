import React, { Component } from 'react';
import { Document, Page, StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import { uniqueId } from 'uniqid';
import CoverComparedLogo from '../assets/img/logo-final-light.png';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    index: '499',
  },
  container: {
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  justify_between: {
    justifyContent: 'space-between',
  },
  topLogo: {
    width: 100,
  },
  msoLogo: {
    height: '80pt',
    width: '80pt',
    marginTop: 10,
  },
  border_right: {
    borderRight: '1pt solid black',
  },
  border_left: {
    borderLeft: '1pt solid black',
  },
  border_top: {
    borderTop: '1pt solid black',
  },
  border_bottom: {
    borderBottom: '1pt solid black',
  },
  center: {
    textAlign: 'center',
  },
  tableCol: {
    width: '16%',
    paddingHorizontal: 4,
    paddingVertical: 2,
    height: 'auto',
  },
  tableHeader: {
    fontSize: '12pt',
    backgroundColor: '#e5e7eb',
  },
  tableNamecol: {
    width: '18%',
  },
  tableContent: {
    fontSize: '10pt',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mt: {
    marginTop: '30pt',
  },
  paymentDetailsContainer: {
    width: '50%',
  },
  justify_end: {
    justifyContent: 'flex-end',
  },
  borderMY: {
    marginVertical: 10,
  },
  paymentetails: {
    marginVertical: 4,
  },
  total: {
    color: '#011b41',
    fontSize: '14pt',
  },
  policyNumber: {
    fontSize: '12pt',
  },
});

const getCurrentDate = () => {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${date > 9 ? date : 0 + date}-${month > 9 ? month : 0 + month}-${year}`;
};

const MSOReceipt = (props) => {
  const {
    membersInfo,
    quote,
    discount,
    total,
    tax,
    discountAmount,
    addonServices,
    applyDiscount,
    MSOAddOnService,
    name,
    logo,
  } = props;

  return (
    <Document style={styles.doc}>
      <Page style={styles.page}>
        <View style={styles.container}>
          <View style={[styles.row, styles.justify_between]}>
            <View style={styles.topLogo}>
              <Image source={CoverComparedLogo} />
            </View>
            <View>
              <Text>Date: {getCurrentDate()}</Text>
            </View>
          </View>

          <View style={[styles.topLogo, styles.msoLogo]}>
            <Image source={logo} />
          </View>

          <View style={styles.total}>
            <Text>{name}</Text>
          </View>
          <View style={[styles.paymentetails, styles.total, styles.policyNumber]}>
            <Text>Policy Number: 123654</Text>
          </View>

          <View
            style={[
              styles.row,
              styles.border_bottom,
              styles.border_left,
              styles.border_right,
              styles.border_top,
              styles.mt,
              styles.tableHeader,
            ]}
          >
            <View style={[styles.center, styles.tableCol, styles.border_right]}>
              <Text> User type </Text>
            </View>
            <View
              style={[styles.center, styles.tableCol, styles.border_right, styles.tableNamecol]}
            >
              <Text> First Name </Text>
            </View>
            <View
              style={[styles.center, styles.tableCol, styles.border_right, styles.tableNamecol]}
            >
              <Text> Last Name </Text>
            </View>
            <View style={[styles.center, styles.tableCol, styles.border_right]}>
              <Text> Country </Text>
            </View>
            <View style={[styles.center, styles.tableCol, styles.border_right]}>
              <Text> DOB </Text>
            </View>
            <View style={[styles.center, styles.tableCol]}>
              <Text> Identity </Text>
            </View>
          </View>

          {membersInfo.map((member) => (
            <View
              style={[styles.row, styles.border_bottom, styles.border_left, styles.border_right]}
            >
              <View
                style={[styles.center, styles.tableCol, styles.border_right, styles.tableContent]}
              >
                <Text> {member.userType} </Text>
              </View>
              <View
                style={[
                  styles.center,
                  styles.tableCol,
                  styles.border_right,
                  styles.tableContent,
                  styles.tableNamecol,
                ]}
              >
                <Text> {member.firstName} </Text>
              </View>
              <View
                style={[
                  styles.center,
                  styles.tableCol,
                  styles.border_right,
                  styles.tableContent,
                  styles.tableNamecol,
                ]}
              >
                <Text> {member.lastName} </Text>
              </View>
              <View
                style={[styles.center, styles.tableCol, styles.border_right, styles.tableContent]}
              >
                <Text> {member.country} </Text>
              </View>
              <View
                style={[styles.center, styles.tableCol, styles.border_right, styles.tableContent]}
              >
                <Text> {member.dob} </Text>
              </View>
              <View style={[styles.center, styles.tableCol, styles.tableContent]}>
                <Text> {member.identity} </Text>
              </View>
            </View>
          ))}

          <View style={[styles.row, styles.justify_end, styles.mt]}>
            <View style={styles.paymentDetailsContainer}>
              <View style={[styles.paymentetails, styles.total]}>
                <Text>Payment Details</Text>
              </View>
              <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                <View>
                  <Text>Premium</Text>
                </View>
                <View>
                  <Text>{quote} USD</Text>
                </View>
              </View>
              {!!addonServices && (
                <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                  <View>
                    <Text>Add on concierge services</Text>
                  </View>
                  <View>
                    <Text>{MSOAddOnService} USD</Text>
                  </View>
                </View>
              )}
              <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                <View>
                  <Text>Discount</Text>
                </View>
                <View>
                  <Text>{discountAmount} USD</Text>
                </View>
              </View>
              <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                <View>
                  <Text>Tax</Text>
                </View>
                <View>
                  <Text>{tax} USD</Text>
                </View>
              </View>
              <View style={[styles.border_bottom, styles.borderMY]} />
              <View
                style={[styles.row, styles.justify_between, styles.paymentetails, styles.total]}
              >
                <View>
                  <Text>Total</Text>
                </View>
                <View>
                  <Text>{total} USD</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default MSOReceipt;
