'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { fetchGalleryItems } from './actions'
import { Gallery, Media } from '@/payload-types' // Media型もインポートしておくと安全です

type GalleryGridProps = {
  initialDocs: Gallery[]
  initialHasNextPage: boolean
  initialNextPage: number | null | undefined
}

export const GalleryGrid = ({
  initialDocs,
  initialHasNextPage,
  initialNextPage,
}: GalleryGridProps) => {
  const [docs, setDocs] = useState<Gallery[]>(initialDocs)
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage)
  const [nextPage, setNextPage] = useState<number | null | undefined>(initialNextPage)
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Gallery | null>(null)

  const loadMore = async () => {
    if (!nextPage || loading) return

    setLoading(true)
    try {
      const result = await fetchGalleryItems(nextPage)
      setDocs((prev) => [...prev, ...result.docs])
      setHasNextPage(result.hasNextPage)
      setNextPage(result.nextPage)
    } catch (error) {
      console.error('Failed to load gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const openModal = (item: Gallery) => {
    setSelectedImage(item)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div>
      {/* Masonry Grid */}
      {/* gap-y-6 を space-y-6 の代わりに使用して、columnレイアウトでの予期せぬ余白を防ぎます */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {docs.map((item) => {
          // 画像データ型の安全性確保（PayloadのMedia型にキャストあるいはチェック）
          const image = item.image as Media | undefined
          const imageUrl = typeof item.image === 'string' ? item.image : image?.url

          return (
            <div
              key={item.id}
              // mb-6を追加して、上下の要素間の余白を作ります（columns内ではgapが縦には効かないことがあるため）
              className="break-inside-avoid mb-6 bg-white p-3 border-3 border-border shadow-hard rounded-sm cursor-pointer hover:-translate-y-1 hover:shadow-hard-lg transition-all"
              onClick={() => openModal(item)}
            >
              <div className="relative w-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    // 画像の本来のサイズを指定することでアスペクト比を維持
                    // データに幅/高さがない場合のフォールバック値を入れています
                    width={image?.width || 800}
                    height={image?.height || 600}
                    className="w-full h-auto object-cover rounded-sm"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full aspect-video bg-gray-100 text-gray-300">
                    No Image
                  </div>
                )}
              </div>
              {/* タイトル表示を削除しました */}
            </div>
          )
        })}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="text-center mt-16">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 bg-white text-text font-black rounded-full border-3 border-border shadow-hard hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '読み込み中...' : 'もっと見る'}
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 md:p-6 rounded-3xl border-4 border-border shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 flex flex-col md:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-500 hover:bg-gray-200 border-2 border-border transition-colors md:hidden"
            >
              ✕
            </button>

            {/* Image Side - モーダルでは大きく見せるために contain を維持 */}
            <div className="w-full md:w-2/3 relative min-h-[300px] md:min-h-[500px] bg-gray-100 border-3 border-border rounded-xl overflow-hidden shrink-0">
              {(() => {
                const img = selectedImage.image as Media | undefined
                const url = typeof selectedImage.image === 'string' ? selectedImage.image : img?.url
                return url ? (
                  <Image
                    src={url}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300">
                    No Image
                  </div>
                )
              })()}
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/3 flex flex-col">
              <button
                onClick={closeModal}
                className="self-end w-10 h-10 bg-gray-100 rounded-full hidden md:flex items-center justify-center font-black text-gray-500 hover:bg-gray-200 border-2 border-border transition-colors mb-4"
              >
                ✕
              </button>

              <h2 className="text-left p-0 text-2xl md:text-3xl font-black text-text mb-2 leading-tight">
                {selectedImage.title}
              </h2>
              {selectedImage.shotDate && (
                <p className="text-sm font-bold text-gray-400 mb-4 pb-4 border-b-2 border-dashed border-gray-200">
                  {new Date(selectedImage.shotDate).toLocaleDateString('ja-JP')}
                </p>
              )}

              {selectedImage.description && (
                <div className="prose prose-sm font-medium text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {selectedImage.description}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
