import React, { Component } from 'react';
import { Document, Page, StyleSheet, View, Text, Image } from '@react-pdf/renderer';

import CoverComparedLogo from '../assets/img/logo-final-light.png';
import P4LLogo from '../assets/img/p4l-logo.png';

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    index: '499',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  justify_between: {
    justifyContent: 'space-between',
  },
  justify_end: {
    justifyContent: 'flex-end',
  },
  topLogo: {
    width: 100,
  },
  p4lLogo: {
    width: '90pt',
    marginVertical: 15,
    marginLeft: '6pt',
  },
  total: {
    color: '#011b41',
    fontSize: '14pt',
    fontWeight: 'semibold',
    marginBottom: '6pt',
  },
  paymentetails: {
    marginVertical: 4,
    fontSize: '10pt',
  },
  mt: {
    marginTop: '30pt',
  },
  personalInfoContainer: {
    width: '30%',
  },
  deviceDetailsContainer: {
    width: '50%',
  },
  deviceDetails: {
    marginRight: '6pt',
  },
  border_bottom: {
    borderBottom: '1pt solid black',
  },
  borderMY: {
    marginVertical: 6,
  },
  text_right: {
    textAlign: 'right',
  },
  modelDetails: {
    marginLeft: 16,
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const DeviceReceipt = (props) => {
  const {
    txn_hash,
    quote,
    total,
    discountAmount,
    fName,
    lName,
    phone,
    email,
    deviceType,
    brand,
    value,
    purchaseMonth,
    plan_currency,
    selectedModel,
    logo = P4LLogo,
  } = props;

  const getCurrentDate = () => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${date > 9 ? date : 0 + date}-${month > 9 ? month : 0 + month}-${year}`;
  };

  return (
    <Document style={styles.doc}>
      <Page style={styles.page}>
        <View style={styles.container}>
          <View style={[styles.row, styles.justify_between]}>
            <View style={styles.row}>
              <View style={styles.topLogo}>
                <Image source={CoverComparedLogo} />
              </View>
              <View style={styles.p4lLogo}>
                <Image source={logo} />
              </View>
            </View>
            <View>
              <Text>Date: {getCurrentDate()}</Text>
            </View>
          </View>

          <View style={[styles.row, styles.justify_between]}>
            <View>
              <View style={[styles.total]}>
                <Text>Device Insurance</Text>
              </View>
              <View style={[styles.total, styles.paymentetails]}>
                <Text>Policy ID: {txn_hash}</Text>
              </View>
              <View style={[styles.total, styles.paymentetails]}>
                <Text>First Name: {fName}</Text>
              </View>
              <View style={[styles.total, styles.paymentetails]}>
                <Text>Last Name: {lName}</Text>
              </View>
              <View style={[styles.total, styles.paymentetails]}>
                <Text>Phone: {phone}</Text>
              </View>
              <View style={[styles.total, styles.paymentetails]}>
                <Text>Email: {email}</Text>
              </View>
            </View>

            <View style={styles.deviceDetailsContainer}>
              <View style={styles.total}>
                <Text>Device Details</Text>
              </View>
              <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                <View style={styles.deviceDetails}>
                  <Text>Device Type</Text>
                </View>
                <View>
                  <Text>{deviceType}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                <View style={styles.deviceDetails}>
                  <Text>Device Brand</Text>
                </View>
                <View>
                  <Text>{brand}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                <View style={styles.deviceDetails}>
                  <Text>Device Value</Text>
                </View>
                <View>
                  <Text>
                    {value} {plan_currency}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                <View style={styles.deviceDetails}>
                  <Text>Purchase Month</Text>
                </View>
                <View>
                  <Text>{purchaseMonth}</Text>
                </View>
              </View>
              <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                <View style={styles.deviceDetails}>
                  <Text>Device Model</Text>
                </View>
                <View style={[styles.row, styles.modelDetails]}>
                  <Text>
                    {typeof selectedModel === 'string'
                      ? selectedModel
                      : selectedModel?.model_name || ''}
                  </Text>
                </View>
              </View>

              <View style={styles.mt}>
                <View style={styles.total}>
                  <Text>Payment Details</Text>
                </View>
                <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                  <View style={styles.deviceDetails}>
                    <Text>Premium</Text>
                  </View>
                  <View>
                    <Text>{quote} USD</Text>
                  </View>
                </View>
                <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
                  <View style={styles.deviceDetails}>
                    <Text>Discount</Text>
                  </View>
                  <View>
                    <Text>{discountAmount} USD</Text>
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
        </View>
      </Page>
    </Document>
  );
};
export default DeviceReceipt;
