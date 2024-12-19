import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import JobOrdersTable from '../components/JobOrdersTable';

const JobOrders = () => {
    return (
    <>
        <Breadcrumb pageName="Job Orders" />

        <div className="flex flex-col gap-10">

            <JobOrdersTable />
        </div>
    </>
    );
};

export default JobOrders;
    