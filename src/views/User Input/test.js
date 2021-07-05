// import React, { Component } from "react";
// import { render } from "react-dom";
// import "./style.css";

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       cat1: {},
//       cat2: {},
//     };
//     this.onPasteFunc = this.onPaste.bind(this);
//   }

//   onPaste(event) {
//     event.clipboardData.items[0].getAsString((text) => {
//       let lines = text.split("\n");
//       let i = 1;
//       lines.forEach((line) => {
//         let cell = line.split("\t");
//         let newCat = {
//           name: cell[0],
//           age: cell[1],
//           breed: cell[2],
//         };
//         let key = `cat${i}`;
//         this.setState({
//           [key]: newCat,
//         });
//         i++;
//       });
//     });
//   }

//   render() {
//     return (
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Age</th>
//               <th>Breed</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <input
//                   type="text"
//                   value={this.state.cat1.name}
//                   onPaste={this.onPasteFunc}
//                 />
//               </td>
//               <td>
//                 <input type="text" value={this.state.cat1.age} />
//               </td>
//               <td>
//                 <input type="text" value={this.state.cat1.breed} />
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <input type="text" value={this.state.cat2.name} />
//               </td>
//               <td>
//                 <input type="text" value={this.state.cat2.age} />
//               </td>
//               <td>
//                 <input type="text" value={this.state.cat2.breed} />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// render(<App />, document.getElementById("root"));
