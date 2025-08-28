import { GalleryVerticalEnd } from "lucide-react";
import RegisterForm from "../_Components/Register-form/RegisterForm";
import registerimage from "../../../public/Sign up.gif";
import Image from "next/image";

export default function Register() {
	return (
		<div className=" shadow rounded-2xl shadow-slate-700 grid lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 w-full items-center justify-center">
					<div className="w-full max-w-md">
						<RegisterForm />
					</div>
				</div>
			</div>
			<div className="bg-muted relative hidden lg:block rounded-r-2xl shadow">
				<Image
					src={registerimage}
					alt="Image"
					className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.6]"
				/>
			</div>
		</div>
	);
}
