import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getProductsCount } from "@/actions/get-products-count";
import { getSalesCount } from "@/actions/get-sales-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPage {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPage> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const productCount = await getProductsCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="md:grid md:gap-4 md:grid-cols-3 sm:flex space-y-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text2xl font-bold">{salesCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products in Store
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text2xl font-bold">{productCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="col-span-4">
              <CardTitle className="text-sm font-medium">Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
