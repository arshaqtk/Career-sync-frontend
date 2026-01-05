import { useVerifyRegisterOtp} from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';
import VerifyOtp from '../components/VerifyOtp';

export const VerifyRegisterOtp = () => {

    const { state } = useLocation();
    const email = state?.email;
    const { mutate, isPending } = useVerifyRegisterOtp();


    return (
        <VerifyOtp email={email} purpose={"register"} mutateFn={mutate}  isPending={isPending} />
        
        
    )
}
