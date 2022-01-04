// import { useState, useEffect } from 'react';
// import useActiveWeb3React from './useActiveWeb3React';
// import { getDistributorAddress } from '../utils/addressHelpers';
// // import { axiosGet } from '../utils/apiHelper';
// import { useDistributorContract } from './useContract';

// const chains = {
//   1: 'eth',
//   4: 'rinkeby',
//   42: 'kovan',
// }

// export const fetchNexusMutualCover = async (distributorContract, policies, userList) => {
//   // const _calls =  userList.map(async (policy) => {
//   //   return  distributorContract.getCover(policy.token_id === undefined ? "0" : policy.token_id.toString());
//   // });
//   // const res = await Promise.all(_calls).then(values => {
//   //   return values;
//   // });  [userList[index].token_id]: res[index]

//   return policies.map((policy, index) => ({ ...policy, token_id: userList[index].token_id }));
// };

// export const useGetNexusMutualCoverUserList = () => {
//   const [events, setEvents] = useState(null);
//   const { account, chainId } = useActiveWeb3React();

//   useEffect(() => {
//     const get = async () => {
//       const nexusAddr = await getDistributorAddress();
//       const endPoints = `${account}/nft/${nexusAddr}?chain=${chains[chainId]}&format=decimal`;
//       const res = await axiosGet(endPoints);
//       if (res.status === 200) {
//         setEvents(res.data.result);
//       }
//     };
//     if (account) {
//       get();
//     }
//   }, [account, chainId]);

//   return events;
// };

// const useGetNexusMutualCover = (policies) => {
//   const [data, setData] = useState(null);
//   const distributorContract = useDistributorContract();
//   const userList = useGetNexusMutualCoverUserList();

//   useEffect(() => {
//     const get = async () => {
//       const res = await fetchNexusMutualCover(distributorContract, policies, userList);
//       if (res.length === policies.length) {
//         setData(res);
//       }
//     };
//     if (userList) {
//       get();
//     }
//   }, [distributorContract, userList]);

//   return data;
// };

// export default useGetNexusMutualCover;
