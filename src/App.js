import {default as TicTacToeGame} from "./TicTacToeGame";
import {default as SearchableList} from './SearchableList';


export default function App(){
  const FianlAppExport = []
  FianlAppExport.push(TicTacToeGame())
  FianlAppExport.push(SearchableList())
  return <div><ul>{FianlAppExport}</ul></div>;
}
