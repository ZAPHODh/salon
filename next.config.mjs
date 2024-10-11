import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    compiler: {
        styledComponents: true,
    },
}

export default bundleAnalyzer(nextConfig)
