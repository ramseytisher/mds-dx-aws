# Not an official Dx Lookup
This tool is a prototype for what could be done to provide a diagnosis lookup to support PDPM ICD-10 Mappings based on information provided by CMS.

## Source information
NTA Comorbidity Score: https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/SNFPPS/Downloads/PDPM_Fact_Sheet_NTAComorbidityScoring_v2_508.pdf
PDPM ICD-10 Mappings: https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/SNFPPS/PDPM.html (very bottom link)

# What Other Vendors Are Doing
http://www.matrixcare.com/pdpm/

# Work that needs done to make this PRODUCTION ready
- Compile a better/official translation of the CMS data files
- Reduce the overall size of the app as much as possible, CSV currenty is 8MB (Remove N/As, Codify Categories & Common Text)
- Build a better installing/loading screen process
- Make a way to filter out Return to Providers
- Sorting?
- More help information
- Styling to better fit when running in PowerChart
- Move repo to official Cerner repo's
- Do we need to run this by UX?

# UX Request
https://jira3.cerner.com/browse/UXREQ-12239
