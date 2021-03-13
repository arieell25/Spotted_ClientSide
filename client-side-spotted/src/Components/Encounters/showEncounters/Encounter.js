import { React } from 'react'

export default function Encounter({ encounter }) {


    return (
        <tr style={{ marginBottom: "14px" }}>
            <td>
                {encounter.EncounterID}
            </td>
            <td>
                {encounter.EncounterDate}
            </td>
            <td>
                {encounter.SiteID}
            </td>
        </tr>
    )
}
