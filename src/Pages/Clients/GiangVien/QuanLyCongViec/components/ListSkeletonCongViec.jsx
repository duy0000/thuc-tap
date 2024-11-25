import { Skeleton } from '@mui/material'

function ListSkeletonCongViec() {
  return (
    <div className="my-2">
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={'100%'}
        height={40}
        sx={{ mb: 1 }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={'100%'}
        height={40}
        sx={{ mb: 1 }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={'100%'}
        height={40}
        sx={{ mb: 1 }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={'100%'}
        height={40}
        sx={{ mb: 1 }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={'100%'}
        height={40}
        sx={{ mb: 1 }}
      />
    </div>
  )
}

export default ListSkeletonCongViec
