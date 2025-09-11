import React from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { ControllerRenderProps } from "react-hook-form";

export default function ResetPasswordOTP(props: {
	field: ControllerRenderProps<
		| {
				newPassword: string;
				rePassword: string;
				email: string;
		  }
		| {
				email: string;
		  }
		| {
				resetCode: string;
		  },
		"resetCode"
	>;
	isLoading: boolean;
}) {
	return (
		<InputOTP
			maxLength={6}
			disabled={props.isLoading}
			// minLength={6}
			pattern={REGEXP_ONLY_DIGITS}
			// required
			{...props.field}
			className="">
			<InputOTPGroup>
				<InputOTPSlot index={0} className="w-10 h-10 lg:w-15 lg:h-15" />
				<InputOTPSlot index={1} className="w-10 h-10 lg:w-15 lg:h-15" />
				<InputOTPSlot index={2} className="w-10 h-10 lg:w-15 lg:h-15" />
				<InputOTPSlot index={3} className="w-10 h-10 lg:w-15 lg:h-15" />
				<InputOTPSlot index={4} className="w-10 h-10 lg:w-15 lg:h-15" />
				<InputOTPSlot index={5} className="w-10 h-10 lg:w-15 lg:h-15" />
			</InputOTPGroup>
		</InputOTP>
	);
}
