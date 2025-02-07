import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';
import PlanForm from '@/ui/plan/plan-form';
import { getOnePlan } from '@/lib/dao/plan';

export default async function CreatePage({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return <p>Access denied</p>;
    }
    const plan = searchParams['plan']
        ? await getOnePlan(Number(searchParams['plan']), session.user.id)
        : null;
    return (
        <PlanForm userId={session.user.id} plan={plan} />
    );
}

