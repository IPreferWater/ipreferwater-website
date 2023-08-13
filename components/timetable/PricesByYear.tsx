
type PricesByYearProps = {
    bla : String
}

  export function PricesByYear({bla}:PricesByYearProps) {

    return (


<div>
  <div className="m-4">
  <h1 className="text-2xl font-bold">Tarifs inscriptions adultes ( 16 ans + )</h1>
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">

                </th>
                <th scope="col" className="px-6 py-3">
                    A Partir de Septembre 2022
                </th>
                <th scope="col" className="px-6 py-3">
                A Partir de Janvier 2023
                </th>
                <th scope="col" className="px-6 py-3">
                A Partir de Mars 2023
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                Muay-Thaï
                </th>
                <td className="px-6 py-4">
                    190€
                </td>
                <td className="px-6 py-4">
                    160€
                </td>
                <td className="px-6 py-4">
                    130€
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                Jujitsu brésilien/Grappling ( 16 ans et + )
                </th>
                <td className="px-6 py-4">
                    190€
                </td>
                <td className="px-6 py-4">
                    160€
                </td>
                <td className="px-6 py-4">
                    130€
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                Toutes disciplines (Muay-Thaï + Jujitsu)
                </th>
                <td className="px-6 py-4">
                    310€
                </td>
                <td className="px-6 py-4">
                    250€
                </td>
                <td className="px-6 py-4">
                    190€
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>

<div className="m-4">
    <h1 className="text-2xl font-bold">Tarifs inscriptions enfants ( 8 - 15 ans)</h1>
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">

                </th>
                <th scope="col" className="px-6 py-3">
                    A Partir de Septembre 2022
                </th>
                <th scope="col" className="px-6 py-3">
                A Partir de Janvier 2023
                </th>
                <th scope="col" className="px-6 py-3">
                A Partir de Mars 2023
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                Muay-Thaï
                </th>
                <td className="px-6 py-4">
                    110€
                </td>
                <td className="px-6 py-4">
                    90€
                </td>
                <td className="px-6 py-4">
                    80€
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                Jujitsu brésilien/Grappling
                </th>
                <td className="px-6 py-4">
                    110€
                </td>
                <td className="px-6 py-4">
                    90€
                </td>
                <td className="px-6 py-4">
                    80€
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                Toutes disciplines (Muay-Thaï + Jujitsu)
                </th>
                <td className="px-6 py-4">
                    150€
                </td>
                <td className="px-6 py-4">
                    110€
                </td>
                <td className="px-6 py-4">
                    90€
                </td>
            </tr>

        </tbody>
    </table>
    </div>


</div>
</div>



)
  }