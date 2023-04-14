import TableBody from "../tables/TableBody";
import TableHeader from "../tables/TableHeader";
import styled from 'styled-components';
import EditCase from "../dashboard/EditCase";
import DeleteCase from "../dashboard/DeleteCase";

const TableBodyWrapper = styled.tbody`
  word-wrap: break-word;
`;

const TableCell = styled.td`
    padding: 10px;
    border-bottom: .5px solid #d1d5db;
    color: black;
`

const SingleSuitDetail = ({param}) => {
        return (
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="p-4 border border-blue-200 rounded-lg bg-blue-100 dark:bg-blue-400">
                            <table className="min-w-full divide-y bg-gray-200"> 
                                <TableHeader/>                                  
                                {
                                    param?.map((item) => (
                                        <tr key={item?.id}>
                                            <TableCell>
                                            {item?.id}
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
                                                <EditCase single_param={item} />
                                            </TableCell>
                                            <TableCell>
                                                <DeleteCase single_param={item}/>
                                            </TableCell>                                
                                        </tr>                                      
                                    ))
                                }                            
                                                                     
                            </table>

                        </div>
                    </div>    
                </div>
            </div>
        )
    }

export default SingleSuitDetail;