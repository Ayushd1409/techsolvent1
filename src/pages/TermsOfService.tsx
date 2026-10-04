import { Helmet } from "react-helmet-async";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";

export default function TermsOfService() {
    return (
        <PageLayout>
            <Helmet>
                <title>Terms of Service | TechSolvent</title>
                <meta name="description" content="Review TechSolvent's terms of service regarding the use of our website, agency services, and digital products." />
                <link rel="canonical" href="https://techsolvent.in/terms-of-service" />
            </Helmet>
            <PageHero
                variant="about"
                title="Terms of Service"
                subtitle="Last Updated: October 2023"
                align="left"
            />
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl prose prose-slate dark:prose-invert">
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By accessing or using the TechSolvent website, services, or tools, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access our service.
                    </p>

                    <h2>2. Intellectual Property Rights</h2>
                    <p>
                        Other than the content you own, under these Terms, TechSolvent and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
                    </p>

                    <h2>3. Restrictions</h2>
                    <p>You are specifically restricted from all of the following:</p>
                    <ul>
                        <li>Publishing any Website material in any other media without prior consent.</li>
                        <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
                        <li>Publicly performing and/or showing any Website material.</li>
                        <li>Using this Website in any way that is or may be damaging to this Website.</li>
                        <li>Using this Website in any way that impacts user access to this Website.</li>
                        <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
                    </ul>

                    <h2>4. Disclaimer of Warranties</h2>
                    <p>
                        This website is provided "as is," with all faults, and TechSolvent makes no express or implied representations or warranties, of any kind related to this website or the materials contained on this website. Additionally, nothing contained on this website shall be construed as providing consult or advice to you.
                    </p>

                    <h2>5. Limitation of Liability</h2>
                    <p>
                        In no event shall TechSolvent, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. TechSolvent, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                    </p>

                    <h2>6. Governing Law & Jurisdiction</h2>
                    <p>
                        These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.
                    </p>
                </div>
            </section>
        </PageLayout>
    );
}
