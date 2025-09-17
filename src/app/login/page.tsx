import loginimage from "../../../public/login.gif";
import Image from "next/image";
import LoginForm from "../_Components/LoginForm/LoginForm";
import * as motion from "motion/react-client";

export default function Login() {
	return (
		<motion.div
			className=" shadow rounded-2xl min-h-[calc(100vh-2rem-60px)] shadow-slate-700 grid lg:grid-cols-2"
			initial={{ scale: 0.5, opacity: 0 }}
			animate={{
				opacity: 1,
				scale: 1,
				transition: {
					duration: 0.5,
				},
			}}>
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 w-full items-center justify-center">
					<div className="w-full max-w-md">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="bg-muted relative hidden lg:block rounded-r-2xl shadow">
				<Image
					src={loginimage}
					alt="Image"
					className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.6]"
				/>
			</div>
		</motion.div>
	);
}
