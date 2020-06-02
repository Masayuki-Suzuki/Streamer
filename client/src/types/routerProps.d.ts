import * as H from 'history'
import { match } from 'react-router-dom'

export type RouterProps<Params> = {
    match: match<Params>
    location: H.Location
    history: H.History
}
