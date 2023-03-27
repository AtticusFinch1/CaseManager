import styled from 'styled-components';
import TableHeader from './TableHeader';

const TableCell = styled.td`
    padding: 10px;
    border-bottom: .5px solid #d1d5db;
    color: black;
`
const TableBodyWrapper = styled.tbody`
  word-wrap: break-word;
`;

const TableBody = (item) => {
    console.log(item);
    return (
            <tr key={item.id}>
                <TableCell>
                {item.id}
                </TableCell>
                <TableCell>
                    {item.title}
                </TableCell>
                <TableCell>                                       
                    {item.description}
                </TableCell>
                <TableCell>
                    {item.steps}
                </TableCell>
                <TableCell>
                    {item.expected}
                </TableCell>
                <TableCell>
                    {item.actual}
                </TableCell>
                <TableCell>
                    {item.comments}
                </TableCell>
                <TableCell>
                    {item.status}
                </TableCell>
                <TableCell>
                    {/* <EditCase single_param={item} /> */}
                </TableCell>
                <TableCell>
                    {/* <DeleteCase param={item}/> */}
                </TableCell>                                
            </tr> 
   )
}

export default TableBody;