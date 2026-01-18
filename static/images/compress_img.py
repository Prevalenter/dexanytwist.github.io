import os
from PIL import Image, ImageOps, UnidentifiedImageError
import time

# 支持的图片扩展名
SUPPORTED_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.bmp', '.webp')

def compress_image(input_path, output_path, target_quality=80, max_dimension=None):
    """
    压缩单张图片
    :param input_path: 输入路径
    :param output_path: 输出路径
    :param target_quality: 保存质量 (1-100)，主要针对 JPG
    :param max_dimension: (可选) 最大边长像素值，例如 1920。如果图片长或宽超过此值，将等比缩放。
    :return: Boolean (是否成功)
    """
    try:
        img = Image.open(input_path)
        
        # 1. 处理手机拍摄照片的旋转问题 (根据 EXIF 信息自动转正)
        img = ImageOps.exif_transpose(img)

        # 2. 调整尺寸 (如果设置了 max_dimension 且图片尺寸超过限制)
        if max_dimension:
            width, height = img.size
            # 如果最长边超过了设定值
            if max(width, height) > max_dimension:
                # 计算缩放比例
                scale_factor = max_dimension / max(width, height)
                new_width = int(width * scale_factor)
                new_height = int(height * scale_factor)
                # 使用高质量重采样滤镜进行调整
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                print(f"   [调整尺寸] {width}x{height} -> {new_width}x{height}", end="")

        # 3. 确定保存参数
        # 获取文件扩展名以决定保存方式
        ext = os.path.splitext(output_path)[1].lower()
        save_kwargs = {'optimize': True} # 对所有格式开启通用优化

        if ext in ['.jpg', '.jpeg']:
            # JPEG 格式支持 quality 参数
            # 如果原图是 RGBA (透明 PNG 转 JPG)，需要先转为 RGB，否则报错
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            save_kwargs['quality'] = target_quality
            # 如果是JPEG也可以尝试使用 progressive=True (渐进式显示)，有时能稍微减小体积
            # save_kwargs['progressive'] = True 
        elif ext == '.png':
            # PNG 是无损格式，quality 参数作用不大，主要靠 optimize=True
            # 可以通过减少颜色数量来压缩 PNG，但可能会损失画质，这里暂不采用。
            pass
            
        # 4. 保存图片
        img.save(output_path, **save_kwargs)
        return True

    except UnidentifiedImageError:
        print(f" ❌ 错误: 无法识别的文件格式 {input_path}")
        return False
    except Exception as e:
        print(f" ❌ 处理出错: {input_path}\n错误信息: {e}")
        return False

def batch_compress_recursive(source_root_dir, output_root_dir, quality=80, max_size=1920):
    """
    递归遍历文件夹进行批量压缩
    """
    print(f"🚀 开始处理...")
    print(f"源目录: {source_root_dir}")
    print(f"输出目录: {output_root_dir}")
    print(f"设置: 质量={quality}, 最大边长={max_size if max_size else '原尺寸'}")
    print("-" * 50)

    start_time = time.time()
    count = 0
    success_count = 0
    
    # os.walk 会遍历所有深度的子文件夹
    # root: 当前正在遍历的文件夹路径
    # dirs: 当前文件夹下的子文件夹列表
    # files: 当前文件夹下的文件列表
    for root, dirs, files in os.walk(source_root_dir):
        # 计算当前文件夹相对于源根目录的相对路径
        # 例如：如果源是 C:\Photos，当前是 C:\Photos\2023\Vacation
        # 相对路径就是 2023\Vacation
        relative_path = os.path.relpath(root, source_root_dir)
        
        # 构建对应的输出文件夹路径
        current_output_dir = os.path.join(output_root_dir, relative_path)
        
        # 如果输出目录不存在，则创建它（包含父级目录）
        if not os.path.exists(current_output_dir):
            os.makedirs(current_output_dir)
            # print(f"📁 创建目录: {current_output_dir}")

        for file in files:
            # 检查是否是支持的图片格式
            if file.lower().endswith(SUPPORTED_EXTENSIONS):
                count += 1
                src_file_path = os.path.join(root, file)
                dst_file_path = os.path.join(current_output_dir, file)
                
                print(f"[{count}] 正在处理: {os.path.join(relative_path, file)} ...", end="", flush=True)
                
                if compress_image(src_file_path, dst_file_path, quality, max_size):
                    # 计算压缩率
                    src_size = os.path.getsize(src_file_path) / 1024 # KB
                    dst_size = os.path.getsize(dst_file_path) / 1024 # KB
                    reduction = (src_size - dst_size) / src_size * 100 if src_size > 0 else 0
                    print(f" ✅ 完成 ({src_size:.0f}KB -> {dst_size:.0f}KB, ⬇️{reduction:.1f}%)")
                    success_count += 1
                else:
                    # compress_image 内部已经打印了错误信息
                    pass
            # else:
            #     print(f"跳过非图片文件: {file}")

    end_time = time.time()
    print("-" * 50)
    print(f"🎉 全部处理完毕！耗时: {end_time - start_time:.2f}秒")
    print(f"共扫描图片: {count} 张，成功压缩: {success_count} 张")

if __name__ == '__main__':
    # ================= 配置区域 =================
    # 输入文件夹路径 (包含子文件夹)
    SOURCE_FOLDER = r"dataset_figs_raw" 
    # 输出文件夹路径 (将自动创建相同的目录结构)
    OUTPUT_FOLDER = r"dataset_figs"
    
    # 压缩质量 (1-100)，建议 75-85 之间，数字越小体积越小画质越差
    JPG_QUALITY = 30
    
    # 【重要】最大边长像素限制。
    # 如果你的图片很大（如手机拍的 4000x3000），设置此项能大幅减小体积。
    # 设置为 None 表示保持原尺寸。建议设置为 1920 (1080P屏幕) 或 2560 (2K屏幕)。
    MAX_DIMENSION = None 
    # ===========================================
    
    # 确保源路径存在
    if not os.path.exists(SOURCE_FOLDER):
        print(f"❌ 错误: 源文件夹不存在 - {SOURCE_FOLDER}")
    else:
        batch_compress_recursive(SOURCE_FOLDER, OUTPUT_FOLDER, JPG_QUALITY, MAX_DIMENSION)