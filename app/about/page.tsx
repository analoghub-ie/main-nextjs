import {MarkdownRenderer} from "@/components/markdownWrapper";
import {AnalogAvatar} from "@/svg/avatar";
import {Breadcrumbs} from "@/components/breadcrumbs";

export default function About() {
    return (
        <>
            <Breadcrumbs elements={[
                {title: 'Home', href: '/'},
                {title: 'About', href: `/about`}
            ]}/>

            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start lg:gap-8">


                <div className="lg:w-2/3 text-left">
                    <MarkdownRenderer>
                        {`
Hi everyone, my name is [Aleksandr Sidun](https://www.linkedin.com/in/sidun-av/), I am an Analog IC Designer and enthusiast.

Analog IC design is a very interesting and challenging job, but the lack of information, user-unfriendly software and knowledge gaps are opposing engineers.

My goal is to create a one-stop website, where all Analog IC design engineers can get and share useful information. 
I will post useful scripts, tutorials, documentation and equations into one knowledge base that will hopefully get 
bookmarked :)

I also believe that analog design is missing some sort of "code style" that should make our designs more clear and friendly.

All the information provided on this website is free. You can use everything for personal purposes for free. If you find 
any mistakes or want to contribute with your own article/script/documentation, please contact me by email:
[suggestions@analoghub.ie](mailto:suggestions@analoghub.ie)

Special thanks to [Timofey Klimov](https://www.linkedin.com/in/klimofey/), who made my ideas come true by 
creating this website.

**Contributors:**

[Timofey Klimov](https://www.linkedin.com/in/klimofey/) - Web development and support

[Eugeny Khanchin](https://www.linkedin.com/in/eugenykhanchin/) - SKILL language expert and first contributor to AnalogHub

[Ivan Smirnov]() - Analog Design and Verilog-A expert


          `}
                    </MarkdownRenderer>
                </div>

                <div className="lg:w-1/3 flex justify-center lg:justify-start mb-4">
                    <AnalogAvatar />
                </div>
            </div>
        </>
    );
}
