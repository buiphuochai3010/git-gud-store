import Image from 'next/image';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full absolute flex justify-center items-center'>
            {/* Background layer with blur using Next.js Image */}
            <div className='absolute inset-0 overflow-hidden'>
                <Image
                    src="/images/login-background.jpg"
                    alt="Login background"
                    fill
                    className='object-cover blur-[2px]'
                    priority // Since it's above the fold
                    quality={75} // Adjust quality as needed
                />
            </div>

            {/* Card layer without blur */}
            {children}
        </div>
    )
}

export default AuthLayout;