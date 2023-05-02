import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
    return <>
        <div className="bg-[#F8F7F6] h-[100vh] flex items-center justify-center">
            <svg className="animate-spin h-20 w-20">
                <FontAwesomeIcon icon={faFan} color="black" />
            </svg>
        </div>
    </>
}