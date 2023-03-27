import {default as TicTacToeGame} from "./TicTacToeGame";
import {default as SearchableList} from './SearchableList';
import {default as FieldConcat} from './ListAdd';

export default function App(){
  const FianlAppExport = [TicTacToeGame(),SearchableList(),FieldConcat()]
  return <div class="center"><ul>{FianlAppExport}</ul></div>;
}
