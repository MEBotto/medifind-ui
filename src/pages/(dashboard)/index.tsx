import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const DashboardIndex = () => {
    return (
        <div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription>
                    </CardDescription>
                    <CardAction>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                        <img src="../../src/images/EmpoleonPlaymatMayorRes.png" alt="" className="w-50 h-50" />
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Agregar Stock
                    </Button>
                    <Button variant="outline" className="w-full">
                        Quitar Stock
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );

};

export default DashboardIndex;