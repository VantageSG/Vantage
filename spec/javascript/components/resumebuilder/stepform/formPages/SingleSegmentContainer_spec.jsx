// import React from 'react';
// import SingleSegmentContainer from '../../../../../../app/javascript/components/resumebuilder/multiStepForm/formPages/Segment/SingleSegmentContainer.jsx';
// import UserContext from '../../../../../../app/javascript/contexts/UserContext';
// import SegmentContentStub from './SegmentContentStub.json'
// import { renderWithRouter, wait, fireEvent, cleanup } from 'test-utils';
// import '@testing-library/jest-dom/extend-expect';
// import axios from 'axios';
// jest.mock('axios');

// afterEach(() => {
//   axios.get.mockReset()
//   cleanup()
// });

// describe('Single Segment Container', () => {
//   it('No data from db', async () => {
    
//     const data = {
//       data: {
        
        
//       },
//         status:200
//       };
//     axios.get.mockImplementation(() => Promise.resolve(data));
//     const noSegmentDataInDb = renderWithRouter(
//       <UserContext.Provider value={{
//         user: {id: 1},
//         isLoggedIn: true,
//       }}>
//       <SingleSegmentContainer
//         key={0}
//           mainQuestions={SegmentContentStub["mainQuestions"]}
//           dynamicQuestions={SegmentContentStub["dynamicQuestions"]}
//           concatQn={SegmentContentStub["concatQn"]}
//           segmentName={SegmentContentStub["segmentName"]}
//           mainAttribute={SegmentContentStub["mainAttribute"]}
//           segmentLabel={SegmentContentStub["segmentLabel"]}
//         />
//       </UserContext.Provider>
//     );

//     await wait(()=>expect(noSegmentDataInDb.getByText(SegmentContentStub["mainQuestions"][0]["label"])).toBeInTheDocument());
//     await wait(()=>expect(noSegmentDataInDb.getByPlaceholderText(SegmentContentStub["mainQuestions"][0]["placeholder"])).toBeInTheDocument());
//     await wait(()=>expect(noSegmentDataInDb.getByText("next")).toBeInTheDocument());
//     await wait(()=>expect(noSegmentDataInDb.queryAllByText("previous").length).toBe(0));
//     fireEvent.change(noSegmentDataInDb.container.querySelector('input'), {
//       target: {
//         value: 'ans1'
//       }
//     })
    
//     for (var i = 1; i < SegmentContentStub["mainQuestions"].length + SegmentContentStub["dynamicQuestions"].length ; i++) {
//       fireEvent.click(
//         noSegmentDataInDb.getByText("next"))
//       fireEvent.change(noSegmentDataInDb.container.querySelector('input'), {
//         target: {
//           value: 'ans' + i + 1
//         }
//       })
//       if (i < SegmentContentStub["mainQuestions"].length ){
//         expect(noSegmentDataInDb.getByText(SegmentContentStub["mainQuestions"][i]["label"])).toBeInTheDocument();
//         expect(noSegmentDataInDb.getByPlaceholderText(SegmentContentStub["mainQuestions"][i]["placeholder"])).toBeInTheDocument();
//       } else {
//         expect(noSegmentDataInDb.getByText(SegmentContentStub["dynamicQuestions"][i-SegmentContentStub["mainQuestions"].length]["label"])).toBeInTheDocument();
//         expect(noSegmentDataInDb.getByPlaceholderText(SegmentContentStub["dynamicQuestions"][i-SegmentContentStub["mainQuestions"].length]["placeholder"])).toBeInTheDocument();
//       }

//       if (i < SegmentContentStub["mainQuestions"].length + SegmentContentStub["dynamicQuestions"].length - 1) {
//         expect(noSegmentDataInDb.getByText("next")).toBeInTheDocument();
//         expect(noSegmentDataInDb.getByText("previous")).toBeInTheDocument();
//       } else {
//         expect(noSegmentDataInDb.getByText("View current section summary")).toBeInTheDocument();
//         expect(noSegmentDataInDb.getByText("previous")).toBeInTheDocument();
//       }   
//     }
//     fireEvent.click(
//       noSegmentDataInDb.getByText("View current section summary"))
//     for (var i = 1; i < SegmentContentStub["mainQuestions"].length + SegmentContentStub["dynamicQuestions"].length ; i++) {
//       expect(noSegmentDataInDb.getByText( "ans" + i+1)).toBeInTheDocument();
//     }
//   });  

//   it('Data from db', async () => {
    
//     const data = {
//       data: {
//         [SegmentContentStub["segmentName"]] : {
//           [SegmentContentStub["concatQn"]["name"]] : "concat answer"
//         }
//       },
//         status:200
//       };
//     axios.get.mockImplementation(() => Promise.resolve(data));
//     const segmentDataInDb = renderWithRouter(
//       <UserContext.Provider value={{
//         user: {id: 1},
//         isLoggedIn: true,
//       }}>
//       <SingleSegmentContainer
//         key={1}
//           mainQuestions={SegmentContentStub["mainQuestions"]}
//           dynamicQuestions={SegmentContentStub["dynamicQuestions"]}
//           concatQn={SegmentContentStub["concatQn"]}
//           segmentName={SegmentContentStub["segmentName"]}
//           mainAttribute={SegmentContentStub["mainAttribute"]}
//           segmentLabel={SegmentContentStub["segmentLabel"]}
//         />
//       </UserContext.Provider>
//     );
//     await wait(() => expect(segmentDataInDb.getByText(SegmentContentStub["mainQuestions"][0]["label"])))
//     await wait(()=>expect(segmentDataInDb.getByText(SegmentContentStub["mainQuestions"][0]["label"])).toBeInTheDocument());
//     await wait(()=>expect(segmentDataInDb.getByPlaceholderText(SegmentContentStub["mainQuestions"][0]["placeholder"])).toBeInTheDocument());
//     await wait(()=>expect(segmentDataInDb.getByText("next")).toBeInTheDocument());
//     await wait(()=>expect(segmentDataInDb.queryAllByText("previous").length).toBe(0));
//     fireEvent.change(segmentDataInDb.container.querySelector('input'), {
//       target: {
//         value: 'ans1'
//       }
//     })
    
//     for (var i = 1; i < SegmentContentStub["mainQuestions"].length  ; i++) {
//       fireEvent.click(
//         segmentDataInDb.getByText("next"))
//       fireEvent.change(segmentDataInDb.container.querySelector('input'), {
//         target: {
//           value: 'ans' + i + 1
//         }
//       })
//         expect(segmentDataInDb.getByText(SegmentContentStub["mainQuestions"][i]["label"])).toBeInTheDocument();
//         expect(segmentDataInDb.getByPlaceholderText(SegmentContentStub["mainQuestions"][i]["placeholder"])).toBeInTheDocument();
//         expect(segmentDataInDb.getByText("next")).toBeInTheDocument();
//         expect(segmentDataInDb.getByText("previous")).toBeInTheDocument();
//     }
//     fireEvent.click(
//       segmentDataInDb.getByText("next"))
//       console.log(segmentDataInDb.container.querySelector('input').value)
//     expect(segmentDataInDb.getByText(SegmentContentStub["concatQn"]["label"])).toBeInTheDocument();
//     expect(segmentDataInDb.container.querySelector('input').value).toBe("concat answer");
//     expect(segmentDataInDb.getByText("View current section summary")).toBeInTheDocument();
//     expect(segmentDataInDb.getByText("previous")).toBeInTheDocument();

it('empty',  () => {})
//     fireEvent.click(
//       segmentDataInDb.getByText("View current section summary"))
//     for (var i = 1; i < SegmentContentStub["mainQuestions"].length; i++) {
//       expect(segmentDataInDb.getByText( "ans" + i+1)).toBeInTheDocument();
//     }
//     expect(segmentDataInDb.getByText( "concat answer")).toBeInTheDocument();
//   }, 10000);  
  
// })
