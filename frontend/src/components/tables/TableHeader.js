import styled from 'styled-components';

const TableHead = styled.thead`
    background-color: #d1d5db;
`

const TableHeader = () => {
    return (
        <TableHead>
            <tr>
                <th
                    scope="col"
                    className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    ID
                </th>
                <th
                    scope="col"
                    className="px-2 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Case Title
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Description
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Reproduction Steps
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Expected Results
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Actual Results
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Comments
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                    Status
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                >
                    Edit
                </th>
                <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                >
                    Delete
                </th>
            </tr>
        </TableHead>
    )    
}

export default TableHeader;