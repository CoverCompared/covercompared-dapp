// import React from 'react';
// import dayjs from 'dayjs';
// import { Document, Page, StyleSheet, View, Text, Image } from '@react-pdf/renderer';

// import msoLogo from '../assets/img/mso-logo.png';
// import { shortenTxHash } from '../utils';
// import { mso_countries } from '../functions/data';

// import CoverComparedLogo from '../assets/img/logo-final-light.png';
// import WishingWell from '../assets/img/wishing-well-logo.png';
// import WCD from '../assets/img/world-class-doctor-logo.png';

// const styles = StyleSheet.create({
//   page: {
//     fontSize: 12,
//     fontFamily: 'Helvetica',
//     index: '499',
//   },
//   container: {
//     paddingHorizontal: 40,
//     paddingVertical: 40,
//   },
//   row: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   justify_between: {
//     justifyContent: 'space-between',
//   },
//   align_center: {
//     alignItems: 'center',
//   },
//   align_start: {
//     alignItems: 'flex-start',
//   },
//   topLogo: {
//     height: '60pt',
//     width: 'auto',
//   },
//   msoLogo: {
//     height: '40pt',
//     width: '40pt',
//     marginLeft: '6pt',
//   },
//   border_right: {
//     borderRight: '1pt solid black',
//   },
//   border_left: {
//     borderLeft: '1pt solid black',
//   },
//   border_top: {
//     borderTop: '1pt solid black',
//   },
//   border_bottom: {
//     borderBottom: '1pt solid black',
//   },
//   center: {
//     textAlign: 'center',
//   },
//   tableCol: {
//     width: '16%',
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     height: 'auto',
//   },
//   tableHeader: {
//     backgroundColor: '#e5e7eb',
//   },
//   tableNamecol: {
//     width: '18%',
//   },
//   tableContent: {
//     fontSize: '10pt',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mt: {
//     marginTop: '30pt',
//   },
//   paymentDetailsContainer: {
//     width: '50%',
//   },
//   justify_end: {
//     justifyContent: 'flex-end',
//   },
//   borderMY: {
//     marginVertical: 6,
//   },
//   paymentetails: {
//     marginVertical: 4,
//   },
//   total: {
//     color: '#011b41',
//     fontSize: '12pt',
//   },
//   policyNumber: {
//     fontSize: '12pt',
//     marginBottom: '0',
//   },
//   bottomNote: {
//     fontSize: '12pt',
//     fontWeight: 'bold',
//     marginTop: 40,
//   },
//   blueText: {
//     color: '#1E3A8A',
//   },
//   msoContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: '8pt',
//     marginBottom: '16pt',
//   },
//   msoImage: {
//     width: 'auto',
//     height: '60pt',
//   },
//   msoText: {
//     backgroundColor: '#007993',
//     backgroundImage: 'linear-gradient(to right, #007993 , #45EA9A)',
//     textAlign: 'center',
//     color: '#ffffff',
//     fontWeight: '600',
//     marginBottom: '40pt',
//   },
// });

// const getCurrentDate = () => {
//   const newDate = new Date();
//   const date = newDate.getDate();
//   const month = newDate.getMonth() + 1;
//   const year = newDate.getFullYear();

//   return `${date > 9 ? date : 0 + date}-${month > 9 ? month : 0 + month}-${year}`;
// };

// const MSOReceipt = (props) => {
//   const {
//     txn_hash,
//     payment_hash,
//     transaction_link,
//     network_name,
//     crypto_currency,
//     currency,
//     membersInfo,
//     quote,
//     total,
//     discountAmount,
//     addonServices,
//     MSOAddOnService,
//     name,
//     logo = msoLogo,
//     MSOCoverUser,
//   } = props;

//   return (
//     <Document style={styles.doc}>
//       <Page style={styles.page}>
//         <View style={styles.container}>
//           <View style={styles.msoContainer}>
//             <Image loading="lazy" src={WishingWell} alt="" style={styles.msoImage} />
//             <Image loading="lazy" src={WCD} alt="" style={styles.msoImage} />
//           </View>
//           <Text style={styles.msoText}>INTERNATIONAL MEDICAL SECOND OPINION</Text>

//           <View style={[styles.row, styles.justify_between]}>
//             <View style={styles.row}>
//               <View>
//                 <Image source={CoverComparedLogo} style={styles.topLogo} />
//               </View>
//             </View>
//             <View>
//               <Text>Date: {getCurrentDate()}</Text>
//             </View>
//           </View>

//           <View style={[styles.row, styles.justify_between, styles.mt]}>
//             <View>
//               <View style={styles.total}>
//                 <Text>{name}</Text>
//               </View>
//               <View style={[styles.paymentetails, styles.total, styles.policyNumber]}>
//                 <Text>{MSOCoverUser}</Text>
//               </View>
//             </View>
//             {payment_hash && (
//               <View>
//                 <View style={[styles.paymentetails, styles.total, styles.policyNumber]}>
//                   <Text>Policy Number: {txn_hash || '-'}</Text>
//                 </View>
//                 <View style={[styles.paymentetails, styles.total, styles.policyNumber]}>
//                   <Text>
//                     Tnx Hash:{' '}
//                     <a
//                       style={styles.blueText}
//                       href={transaction_link}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       {shortenTxHash(payment_hash) || '-'}
//                     </a>
//                   </Text>
//                 </View>
//                 <View style={[styles.paymentetails, styles.total, styles.policyNumber]}>
//                   <Text>Network: Ethereum {network_name || ''}</Text>
//                 </View>
//                 <View style={[styles.paymentetails, styles.total, styles.policyNumber]}>
//                   <Text>Currency: {crypto_currency || '-'}</Text>
//                 </View>
//               </View>
//             )}
//           </View>

//           <View
//             style={[
//               styles.row,
//               styles.border_bottom,
//               styles.border_left,
//               styles.border_right,
//               styles.border_top,
//               styles.mt,
//               styles.tableHeader,
//             ]}
//           >
//             <View style={[styles.center, styles.tableCol, styles.border_right]}>
//               <Text> User type </Text>
//             </View>
//             <View
//               style={[styles.center, styles.tableCol, styles.border_right, styles.tableNamecol]}
//             >
//               <Text> First Name </Text>
//             </View>
//             <View
//               style={[styles.center, styles.tableCol, styles.border_right, styles.tableNamecol]}
//             >
//               <Text> Last Name </Text>
//             </View>
//             <View style={[styles.center, styles.tableCol, styles.border_right]}>
//               <Text> Country </Text>
//             </View>
//             <View style={[styles.center, styles.tableCol, styles.border_right]}>
//               <Text> DOB </Text>
//             </View>
//             <View style={[styles.center, styles.tableCol]}>
//               <Text> Identity </Text>
//             </View>
//           </View>

//           {membersInfo.map((member, i) => (
//             <View
//               key={i}
//               style={[styles.row, styles.border_bottom, styles.border_left, styles.border_right]}
//             >
//               <View
//                 style={[styles.center, styles.tableCol, styles.border_right, styles.tableContent]}
//               >
//                 <Text> {member.userType || member.user_type || ''} </Text>
//               </View>
//               <View
//                 style={[
//                   styles.center,
//                   styles.tableCol,
//                   styles.border_right,
//                   styles.tableContent,
//                   styles.tableNamecol,
//                 ]}
//               >
//                 <Text> {member.firstName || member.first_name || ''} </Text>
//               </View>
//               <View
//                 style={[
//                   styles.center,
//                   styles.tableCol,
//                   styles.border_right,
//                   styles.tableContent,
//                   styles.tableNamecol,
//                 ]}
//               >
//                 <Text> {member.lastName || member.last_name || ''} </Text>
//               </View>
//               <View
//                 style={[styles.center, styles.tableCol, styles.border_right, styles.tableContent]}
//               >
//                 <Text> {mso_countries.find((f) => f.value === member.country)?.label || ''}</Text>
//               </View>
//               <View
//                 style={[styles.center, styles.tableCol, styles.border_right, styles.tableContent]}
//               >
//                 <Text> {dayjs(member.dob).format('DD/MM/YYYY')} </Text>
//               </View>
//               <View style={[styles.center, styles.tableCol, styles.tableContent]}>
//                 <Text> {member.identity} </Text>
//               </View>
//             </View>
//           ))}

//           <View style={[styles.row, styles.justify_end, styles.mt]}>
//             <View style={styles.paymentDetailsContainer}>
//               <View style={[styles.paymentetails, styles.total]}>
//                 <Text>Payment Details</Text>
//               </View>
//               <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
//                 <View>
//                   <Text>Premium</Text>
//                 </View>
//                 <View>
//                   <Text>{quote} USD</Text>
//                 </View>
//               </View>
//               {!!addonServices && (
//                 <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
//                   <View>
//                     <Text>Add on concierge services</Text>
//                   </View>
//                   <View>
//                     <Text>{MSOAddOnService} USD</Text>
//                   </View>
//                 </View>
//               )}
//               <View style={[styles.row, styles.justify_between, styles.paymentetails]}>
//                 <View>
//                   <Text>Discount</Text>
//                 </View>
//                 <View>
//                   <Text>{discountAmount} USD</Text>
//                 </View>
//               </View>
//               <View style={[styles.border_bottom, styles.borderMY]} />
//               <View
//                 style={[styles.row, styles.justify_between, styles.paymentetails, styles.total]}
//               >
//                 <View>
//                   <Text>Total</Text>
//                 </View>
//                 <View>
//                   <Text>{total} USD</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={[styles.row, styles.bottomNote]}>
//             <View>
//               <Text>
//                 Note - Membership pack including the certificate and plan details will be emailed
//                 directly by the Medical Second Option team to the email address shared at the time
//                 of purchase. You will receive all the necessary information via email within 10
//                 working days from the date of issue of this receipt.
//               </Text>
//             </View>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// };
// export default MSOReceipt;
