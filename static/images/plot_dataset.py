import matplotlib.pyplot as plt
import os
import numpy as np
from PIL import Image
import random

# 设置matplotlib中文字体
plt.rcParams['font.sans-serif'] = ['Arial Unicode MS', 'SimHei']
plt.rcParams['axes.unicode_minus'] = False

def plot_dataset_overview():
    """为每个类别单独绘制一张图，显示该类别的所有图片"""
    dataset_path = "/Users/lx/Data/Work/Paper/DexRIO/code/dexanytwist.github.io/static/images/dataset_figs"
    
    # 创建输出文件夹
    output_dir = "/Users/lx/Data/Work/Paper/DexRIO/code/dexanytwist.github.io/static/images/dataset"
    os.makedirs(output_dir, exist_ok=True)
    
    # 获取所有类别
    categories = sorted([d for d in os.listdir(dataset_path) 
                        if os.path.isdir(os.path.join(dataset_path, d))])
    
    print(f"Found {len(categories)} categories:")
    for cat in categories:
        num_images = len([f for f in os.listdir(os.path.join(dataset_path, cat)) 
                         if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
        print(f"  {cat}: {num_images} images")
    
    # 每行显示的图片数量
    images_per_row = 21
    
    for category in categories:
        category_path = os.path.join(dataset_path, category)
        
        # 获取该类别的所有图片文件
        image_files = [f for f in os.listdir(category_path) 
                      if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        
        # 计算需要的行数
        num_images = len(image_files)
        num_rows = (num_images + images_per_row - 1) // images_per_row  # 向上取整
        
        # 创建图形 - 多行多列布局
        fig, axes = plt.subplots(num_rows, images_per_row, figsize=(42, 2 * num_rows))
        
        # 如果只有一行，确保axes是2D数组
        if num_rows == 1:
            axes = axes.reshape(1, -1)
        
        # 显示所有图片
        for idx, img_file in enumerate(image_files):
            row = idx // images_per_row
            col = idx % images_per_row
            
            try:
                img_path = os.path.join(category_path, img_file)
                with Image.open(img_path) as img:
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    # 将所有图片resize到相同尺寸
                    img = img.resize((128, 128), Image.Resampling.LANCZOS)
                    axes[row, col].imshow(np.array(img))
                
                axes[row, col].axis('off')
                
            except Exception as e:
                print(f"Error loading image {img_path}: {e}")
                axes[row, col].text(0.5, 0.5, 'Error', ha='center', va='center', fontsize=8)
                axes[row, col].axis('off')
        
        # 隐藏空余的子图
        total_subplots = num_rows * images_per_row
        for idx in range(num_images, total_subplots):
            row = idx // images_per_row
            col = idx % images_per_row
            axes[row, col].axis('off')
        
        # 极小间距，图片紧密排列，上下紧贴
        plt.subplots_adjust(left=0, right=1, top=1, bottom=0, wspace=0.02, hspace=0.02)
        
        # 保存到dataset文件夹
        output_path = os.path.join(output_dir, f"{category}.png")
        plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='white')
        print(f"{category} overview saved to: {output_path}")
        
        plt.close()  # 关闭当前图形以释放内存
    
    print(f"All category overviews saved to: {output_dir}")

def plot_category_statistics():
    """绘制每个类别的图片数量统计"""
    dataset_path = "/Users/lx/Data/Work/Paper/DexRIO/code/dexanytwist.github.io/static/images/dataset_figs"
    
    # 统计每个类别的图片数量
    categories = []
    counts = []
    
    for category in sorted(os.listdir(dataset_path)):
        category_path = os.path.join(dataset_path, category)
        if os.path.isdir(category_path):
            num_images = len([f for f in os.listdir(category_path) 
                             if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
            categories.append(category)
            counts.append(num_images)
    
    # 创建条形图
    fig, ax = plt.subplots(figsize=(12, 8))
    bars = ax.bar(categories, counts, color='steelblue', alpha=0.7)
    
    # 在每个条形上方显示数字
    for bar, count in zip(bars, counts):
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                f'{count}', ha='center', va='bottom', fontsize=10)
    
    ax.set_xlabel('Categories', fontsize=12)
    ax.set_ylabel('Number of Images', fontsize=12)
    ax.set_title('Dataset Statistics: Number of Images per Category', fontsize=14)
    
    # 旋转x轴标签以避免重叠
    plt.xticks(rotation=45, ha='right')
    plt.grid(axis='y', alpha=0.3)
    
    # 调整布局
    plt.tight_layout()
    
    # 保存统计图
    stats_output_path = "/Users/lx/Data/Work/Paper/DexRIO/code/dexanytwist.github.io/static/images/dataset_statistics.png"
    plt.savefig(stats_output_path, dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Dataset statistics saved to: {stats_output_path}")
    
    plt.show()
    
    return categories, counts

if __name__ == "__main__":
    print("Plotting dataset overview...")
    plot_dataset_overview()
    
    print("\\nPlotting dataset statistics...")
    categories, counts = plot_category_statistics()
    
    print(f"\\nDataset Summary:")
    print(f"Total categories: {len(categories)}")
    print(f"Total images: {sum(counts)}")
    print(f"Average images per category: {sum(counts)/len(categories):.1f}")