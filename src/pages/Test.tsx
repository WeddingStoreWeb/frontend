import React, { useState, ChangeEvent } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import axios from 'axios';

// Define TypeScript interfaces
interface Photo {
  photoURL: string;
}

interface FitOnOption {
  optionType: 'KEEP' | 'FIRST' | 'SECOND';
  priceAdjustment: number;
}

interface ProductData {
  name: string;
  baseRentalPrice: number;
  description: string;
  availabilityStatus: 'AVAILABLE' | 'UNAVAILABLE';
  imageUrl: string;
  category: string;
  photos: Photo[];
  fitOnOptions: FitOnOption[];
  features: string;
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    baseRentalPrice: 0,
    description: '',
    availabilityStatus: 'AVAILABLE',
    imageUrl: '',
    category: '',
    photos: [],
    fitOnOptions: [],
    features: ''
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle fit option changes
  const handleFitOptionChange = (index: number, field: keyof FitOnOption, value: string | number) => {
    setFormData(prev => {
      const newFitOptions = [...prev.fitOnOptions];
      newFitOptions[index] = {
        ...newFitOptions[index],
        [field]: value
      };
      return {
        ...prev,
        fitOnOptions: newFitOptions
      };
    });
  };

  // Add new fit option
  const addFitOption = () => {
    setFormData(prev => ({
      ...prev,
      fitOnOptions: [...prev.fitOnOptions, { optionType: 'KEEP', priceAdjustment: 0 }]
    }));
  };

  // Upload images to Firebase
  const uploadImagesToFirebase = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });
    return Promise.all(uploadPromises);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload images to Firebase
      const photoURLs = await uploadImagesToFirebase(imageFiles);
      
      // Prepare final data
      const finalData: ProductData = {
        ...formData,
        photos: photoURLs.map(url => ({ photoURL: url }))
      };

      // Make API call
      const response = await axios.post('http://localhost:8080/api/products/CreateProduct', finalData);
      console.log('Product created:', response.data);
      
      // Reset form or handle success
      setFormData({
        name: '',
        baseRentalPrice: 0,
        description: '',
        availabilityStatus: 'AVAILABLE',
        imageUrl: '',
        category: '',
        photos: [],
        fitOnOptions: [],
        features: ''
      });
      setImageFiles([]);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Base Rental Price</label>
        <input
          type="number"
          name="baseRentalPrice"
          value={formData.baseRentalPrice}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Photos</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          accept="image/*"
        />
      </div>

      <div>
        <label className="block mb-1">Fit Options</label>
        {formData.fitOnOptions.map((option, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <select
              value={option.optionType}
              onChange={(e) => handleFitOptionChange(index, 'optionType', e.target.value)}
              className="p-2 border rounded"
            >
              <option value="KEEP">Keep</option>
              <option value="FIRST">First</option>
              <option value="SECOND">Second</option>
            </select>
            <input
              type="number"
              value={option.priceAdjustment}
              onChange={(e) => handleFitOptionChange(index, 'priceAdjustment', parseFloat(e.target.value))}
              className="p-2 border rounded"
              placeholder="Price Adjustment"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addFitOption}
          className="mt-2 px-4 py-2 bg-gray-200 rounded"
        >
          Add Fit Option
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {isLoading ? 'Creating Product...' : 'Create Product'}
      </button>
    </form>
  );
};

export default ProductForm;