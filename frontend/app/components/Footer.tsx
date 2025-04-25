"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 border-t mt-auto bg-background">
      {/* <div className="container flex flex-col gap-10 py-16">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Dashmetrics</h3>
            <p className="text-gray-400">Predicting meme coin futures, so you don't have to sell your organs.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Careers
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Licenses
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Social</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Discord
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              LinkedIn
            </Link>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Dashmetrics. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div> */}
      <div className="container flex flex-col items-center">
        {/* <div className="flex justify-between w-full mb-10">
          <div>
            <h3 className="text-lg font-semibold">Dashmetrics</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/marketplace" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link 
                  href="/documentation" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div> */}
        <h3 className="text-lg font-semibold">Dashmetrics</h3>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Dashmetrics. All rights reserved.</p>
      </div>
    </footer>
  );
}
