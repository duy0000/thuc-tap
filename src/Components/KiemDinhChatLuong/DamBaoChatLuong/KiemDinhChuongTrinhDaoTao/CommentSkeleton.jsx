import { Skeleton, SkeletonItem } from '@/Components/Base'

export default function CommentSkeleton() {
  return (
    <div className="ql-quill ql-snow bg-gray-50 pl-2 pr-3 py-2 rounded-lg">
      <Skeleton
        loading
        template={
          <>
            <SkeletonItem style={{ width: '25%' }} />
            <SkeletonItem />

            <div className="flex items-center gap-1">
              <SkeletonItem style={{ width: 83 }} />
              <div className="shrink-0 w-1 h-1 bg-slate-300 rounded-full"></div>
              <SkeletonItem style={{ width: 65 }} />
              <div className="shrink-0 w-1 h-1 bg-slate-300 rounded-full"></div>
              <SkeletonItem style={{ width: 65 }} />
            </div>
          </>
        }
      />
    </div>
  )
}
